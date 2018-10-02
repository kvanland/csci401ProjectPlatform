package capstone.controller;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import capstone.model.Project;
import capstone.model.users.Stakeholder;
import capstone.model.users.Student;
import capstone.model.users.User;
import capstone.service.EmailService;
import capstone.service.ProjectService;
import capstone.service.UserService;
import capstone.util.Constants;

@RestController
@RequestMapping("/projects")
public class ProjectController 
{
	@Autowired
	private ProjectService projectService;
	@Autowired
	private UserService userService;
	@Autowired
	private EmailService emailService;
	
	
	// Initialize database tables with sample students and projects taken from the Spring 2018 class.
	// Used for initializing the database for testing purposes
	@GetMapping("/init")
	public String initTables() {
		projectService.initTables();
		return Constants.SUCCESS;
	}
	
	/* Getting projects from user information */
	
	@GetMapping("")
	public List<Project> getProjects()
	{
		return projectService.findAll();
	}
	
	// Get all projects that a stakeholder owns
	@GetMapping("/{email:.+}")
	public List<Project> getProjectsByEmail(@PathVariable("email") String email) {
		Stakeholder user = userService.findStakeholderByEmail(email);
		List<Project> projects = userService.getStakeholderProjects(user);
		return projects;
	}
	
	// Get one project that a stakeholder owns
	@GetMapping("/{email:.+}/{projectId}")
	public Project getProjectByEmailAndId(@PathVariable("email") String email,
			@PathVariable("projectId") Long projectId) {
		Stakeholder user = userService.findStakeholderByEmail(email);
		List<Project> projects = userService.getStakeholderProjects(user);
		for (Project project : projects) {
			if (project.getProjectId() == projectId) {
				return project;
			}
		}
		return null;
	}
	
	// Get a student's project
	@GetMapping("/student/{email:.+}")
	public @ResponseBody Project getUserProject(@PathVariable("email") String email) {
		Student user = (Student) userService.findUserByEmail(email);
		System.out.println(user.getProject().getProjectName());
		return user.getProject();
	}
	
	/* Getting users from project information */
	
	@GetMapping("/{projectId}/students")
	public @ResponseBody List<User> getAllStudentsOnProject(@PathVariable("projectId") int projectId) {
		return userService.findAllByProject(projectService.findByProjectId(projectId));
	}
	
	@GetMapping("/{projectId}/stakeholder")
	public @ResponseBody User getStakeholderOnProject(@PathVariable("projectId") int projectId) {
		List<Stakeholder> stakeholders = (List<Stakeholder>) userService.getStakeholders();
		for (Stakeholder s : stakeholders) {
			for (Project p : s.getProjectIds()) {
				if (p.getProjectId() == projectId) {
					return s;
				}
			}
		}
		return null;
	}
	
	/* Project Matching */

	@GetMapping("/assignment")
	public List<Project> projectAssignment()
	{
		System.out.println("running assignment");
		/*// WIP: Return an existing matching if students have already been assigned to projects
		 * List<Project> existing = projectService.getExistingAssignments();
		if (existing != null && existing.size() > 0) {
			return existing;
		}*/
		return projectService.runAlgorithm();
	}
	
	@GetMapping("/assignment/exists")
	public String assignmentExists() {
		List<Project> existing = projectService.getExistingAssignments();
		if (existing != null && existing.size() > 0) {
			return "true";
		}
		return "false";
	}
	
	// Assign projects to students
	@PostMapping("/assign-to-students")
	public @ResponseBody String assignProjectsToStudents(@RequestBody List<Project> projectMatches) {
		List<Project> updatedProjects = new ArrayList<Project>();
		for (Project proj : projectMatches) {
			if (proj.getProjectId() > 0) {
				Project project = projectService.findByProjectId(proj.getProjectId());
				updatedProjects.add(project);
				String messageBody = project.getProjectName() + "\n\n" + project.getBackground() + "\n\n" + project.getDescription()
				+ "\n\n";
				
				for (Student student : proj.getMembers()) {
					// Set the given project for each student
					Student saveStudent = userService.findByUserId(student.getUserId());
					saveStudent.setProject(project);
					emailService.sendEmail("CSCI 401 Project Assignment", messageBody, saveStudent.getEmail());
					userService.saveUser(saveStudent);
				}
			}
		}
		projectService.saveAssignment(updatedProjects);
		return Constants.SUCCESS;
	}
	
	// Submit project ranking for a student
	//@PostMapping("/rankingsSubmitAttempt/{email:.+}")
	@PostMapping("/{email:.+}/submit-ranking")
	public @ResponseBody String projectRankingsSubmission(@PathVariable("email") String email, @RequestBody List<Integer> projects) {
		User user = userService.findUserByEmail(email);
		for (int rank = 1; rank <= 5; rank++) {
			projectService.saveRanking(projects.get(rank-1), user.getUserId(), rank);
		}
		return Constants.SUCCESS;
	}
	
	/* Project submission and status */
	
	// When a stakeholder submits a proposal
	// Save a new project and attach a stakeholder to that project
	@PostMapping("/save/{email:.+}")
	public @ResponseBody Project saveData(@PathVariable("email") String email, 
			@RequestBody Project project)
	{
		System.out.println("Received HTTP POST");
		System.out.println(project);
		System.out.println(project.getProjectName());
		project.setStatusId(1);
		User user = userService.findUserByEmail(email);
	    projectService.save(project);
	    userService.saveProject(user, project);
		return project;
	}
	
	@PostMapping("/pending/{projectId}")
	public @ResponseBody String pendingProjects(@PathVariable("projectId") int projectId) {
		Project project = projectService.findByProjectId(projectId);
		project.setStatusId(1);
		projectService.save(project);
		return Constants.SUCCESS;
	}
	
	@PostMapping("/approve/{projectId}")
	public @ResponseBody String approveProjects(@PathVariable("projectId") int projectId) {
		Project project = projectService.findByProjectId(projectId);
		project.setStatusId(2);
		projectService.save(project);
		return Constants.SUCCESS;
	}
	
	@PostMapping("/reject/{projectId}")
	public @ResponseBody String rejectProjects(@PathVariable("projectId") int projectId) {
		Project project = projectService.findByProjectId(projectId);
		project.setStatusId(3);
		projectService.save(project);
		return Constants.SUCCESS;
	}
	
	@PostMapping("/change/{projectId}")
	public @ResponseBody String requestChangeProjects(@PathVariable("projectId") int projectId) {
		Project project = projectService.findByProjectId(projectId);
		project.setStatusId(4);
		projectService.save(project);
		return Constants.SUCCESS;
	}
	
	@PostMapping("/edit/{projectId}")
	public @ResponseBody String editProject(@PathVariable("projectId") int projectId,
			@RequestBody Project updated_project) {
		System.out.println("Updating Project");
		Project project = projectService.findByProjectId(projectId);
		project.setStatusId(4);

		project.setSemester(updated_project.getSemester());
		project.setTechnologies(updated_project.getTechnologies());
		project.setProjectName(updated_project.getProjectName());
		project.setDescription(updated_project.getDescription());
		project.setBackground(updated_project.getBackground());
		project.setMinSize(updated_project.getMinSize());
		project.setMaxSize(updated_project.getMaxSize());
		
		System.out.println(project);
		System.out.println(project.getProjectName());
		projectService.save(project);
		return Constants.SUCCESS;
	}
	
}

	

