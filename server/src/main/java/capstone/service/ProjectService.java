package capstone.service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import capstone.model.AdminConfiguration;
import capstone.model.Project;
import capstone.model.Ranking;
import capstone.model.users.Student;
import capstone.repository.AdminConfigurationRepository;
import capstone.repository.ProjectsRepository;
import capstone.repository.RankingRepository;
import capstone.util.EncryptPassword;
import capstone.util.ProjectAssignment;

@Service
public class ProjectService {
	@Autowired
	ProjectsRepository repository;
	@Autowired
	UserService userService;
	@Autowired
	RankingRepository rankRepo;
	@Autowired
	AdminConfigurationRepository configRepo;
	
	private ProjectAssignment maxAlgorithm;
	private static String folder_name = "src/main/java/capstone/algorithm/real_data";
	private static int NUM_RANKED = 5; // number of projects that each student can rank
	public static Map<Double, ProjectAssignment> algorithms = new HashMap<>();
	public static Map<Double, Integer> iterations = new HashMap<>();
	private List<Project> savedProjects = new ArrayList<Project>();
	
	public List<Project> runAlgorithm() {
		
		for (int iteration = 0; iteration < 30; iteration++) {
			ArrayList<Project> projects = new ArrayList<>();
			ArrayList<Student> students = new ArrayList<>();
			
			for (Project p : findAll()) {
				projects.add(new Project(p));
			}
			for (Student s : userService.getStudents()) {
				students.add(new Student(s));
			}
			
			List<Ranking> rankings = rankRepo.findAll();
			for (Ranking rank : rankings) {
				Student student = null;
				for (Student s : students) {
					if (s.getUserId() == rank.getStudentId()) {
						student = s;
					}
				}
				
				Project project = null;
				for (Project p : projects) {
					if (p.getProjectId() == rank.getProjectId()) {
						project = p;
					}
				}
				
				if (project != null && student != null) {
					String projectName = project.getProjectName();
		            student.rankings.put(projectName, rank.getRank());
		            student.orderedRankings.add(projectName);
					
					Integer p = ProjectAssignment.getStudentSatScore(rank.getRank());
		            project.incSum_p(p);
		            project.incN();
				}	
			}
			
			ProjectAssignment algorithm = new ProjectAssignment(projects, students);
			algorithm.run(iteration, NUM_RANKED, folder_name);
			double groupSatScore = algorithm.algoSatScore;
			algorithms.put(groupSatScore, algorithm);
			iterations.put(groupSatScore, iteration);
		}

		Double maxScore = Collections.max(algorithms.keySet());
		
		maxAlgorithm = algorithms.get(maxScore);
		Integer maxIteration = iterations.get(maxScore);
		System.out.println("maxScore: " + maxScore + ". maxIteration: " + maxIteration);
		
		System.out.println(maxAlgorithm.JSONOutputWeb());
		savedProjects = maxAlgorithm.assignedProjects();
		return savedProjects;
	}
	
	public void initTables() {
		Vector<Project> projects = new Vector<>();
		Vector<Student> students = new Vector<>();
		String line = null;
        try {
            BufferedReader projectsBR = new BufferedReader(new FileReader(folder_name + "/projects.txt"));

            while((line = projectsBR.readLine()) != null) {                
                String[] elements = line.split(" ");
                
                Project newProject = new Project(ProjectAssignment.getStudentSatScore(1));
                newProject.setProjectName(elements[0]);
                //newProject.setProjectId(projects.size()); // TODO: MAKE THIS DYNAMIC WITH AUTOINCREMENT
                newProject.setMinSize(Integer.parseInt(elements[1]));
                newProject.setMaxSize(Integer.parseInt(elements[2]));
                projects.addElement(newProject);
                
                System.out.println("Saving project: " + newProject.getProjectName());
                save(newProject);
                
                //writer.println(newProject);
            }
            
            projectsBR.close();         
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        //writer.println("");
        
        // import users and rankings from text file
        try {
            BufferedReader studentsBR = new BufferedReader(new FileReader(folder_name + "/rankings.txt"));

            while((line = studentsBR.readLine()) != null) {                
                String[] elements = line.split(" ");
                
                Student newStudent = new Student();
                newStudent.setFirstName("Student");
                String last = elements[0].substring(7);
                newStudent.setLastName(last);
                newStudent.setEmail(elements[0] + "@usc.edu");
                newStudent.setPassword(EncryptPassword.encryptPassword("student"));
                //newStudent.setStudentId(students.size());
                //newStudent.setUserId(students.size());
                
                for (int i = 1; i <= NUM_RANKED; i++) { // for the student's Top 5 projects...
            			int projectId = Integer.parseInt(elements[i]);
            			Project rankedProject = projects.elementAt(projectId - 1); // !!! SUBTRACT 1, as the ranking's indices skip 0 for readability
                		
                		// add rankedProject to the Student data structure:
                    String projectName = rankedProject.getProjectName();
                    newStudent.rankings.put(projectName, i);
                    //newStudent.orderedRankings.add(projectName);
                    
                    // popularity metrics:
                    //Integer p = ProjectAssignment.getStudentSatScore(i);
                    //rankedProject.incSum_p(p);
                    //rankedProject.incN();
                }
                userService.saveUser(newStudent);
                students.addElement(newStudent);
                //writer.println(newStudent);
            }
            
            //writer.println("");
            studentsBR.close();         
        }
        catch(Exception e) {
            e.printStackTrace();
        }
        
        for(Student s: students) {
			for (Map.Entry<String, Integer> entry : s.rankings.entrySet()) {
				Project p  = GetProjectWithName(projects, entry.getKey());
				int projectId = p.getProjectId();
				Long studentId = s.getUserId();
				
				rankRepo.save(new Ranking(studentId, projectId, entry.getValue()));
			}
		}
	}
	
	Project GetProjectWithName(Vector<Project> projects, String projname) {
		for (int j=0; j<projects.size(); j++) {
			if (projects.get(j).getProjectName().equals(projname))
				return projects.get(j);
		}
		return null;
	}
	
	public void save(Project project) {
		repository.save(project);
	}
	
	public List<Project> findAll() {
		return (List<Project>) repository.findAll();
	}

	public void saveRanking(int projectId, Long userId, int ranking) {
		rankRepo.save(new Ranking(userId, projectId, ranking));
	}

	public Project findByProjectId(int projectId) {
		return repository.findByProjectId(projectId);
	}
	
	public void saveAssignment(ArrayList<Project> projects) {
		/*AdminConfiguration ac = configRepo.findById(Long.valueOf(1));
		if (ac == null) {
			ac = new AdminConfiguration();
		}
		ArrayList<Project> finalProjects = (ArrayList<Project>) ac.getAssignment();
		for (Project p : projects) {
			Project saveProj = findByProjectId(p.getProjectId());
			List<Student> saveMembers = saveProj.getMembers();
			for (Student s : p.getMembers()) {
				saveMembers.add(userService.findByUserId(s.getUserId()));
			}
			saveProj.setMembers(saveMembers);
			finalProjects.add(saveProj);
		}
		ac.setAssignment(finalProjects);
		configRepo.save(ac);*/
		savedProjects = projects;
	}

	public List<Project> getExistingAssignments() {
		/*AdminConfiguration ac = configRepo.findById(Long.valueOf(1));
		if (ac == null) {
			return null;
		}
		System.out.println(ac.getAssignment());
		return ac.getAssignment();*/
		return savedProjects;
	}
}
