package capstone.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import capstone.model.Project;
import capstone.model.users.Admin;
import capstone.model.users.Stakeholder;
import capstone.model.users.Student;
import capstone.model.users.User;
import capstone.repository.AdminRepository;
import capstone.repository.StakeholderRepository;
import capstone.repository.StudentRepository;
import capstone.util.Constants;

@Service
public class UserService {
	@Autowired
	private StudentRepository studentRepo;
	@Autowired
	private StakeholderRepository stakeholderRepo;
	@Autowired
	private AdminRepository adminRepo;
	
	public Collection<User> getUsers() {
		Collection<User> users = new Vector<>();
		users.addAll((Collection<? extends User>) studentRepo.findAll());
		users.addAll((Collection<? extends User>) stakeholderRepo.findAll());
		users.addAll((Collection<? extends User>) adminRepo.findAll()); 
		return users;
	}
	
	public Collection<Student> getStudents() {
		return studentRepo.findAll();
	}
	
	public Collection<Stakeholder> getStakeholders() {
		return stakeholderRepo.findAll();
	}
	
	public Collection<Admin> getAdmin() {
		return adminRepo.findAll();
	}
	
	public User findUserByEmail(String email) {
		User u = findStudentByEmail(email);
		if (u == null) {
			u = findStakeholderByEmail(email);
		}
		if (u == null) {
			u = findAdminByEmail(email);
		}
		return u;
	}
	
	public User findUserByAddr(String addr) {
		User u = studentRepo.findByAddr(addr);
		if (u == null) {
			u = stakeholderRepo.findByAddr(addr);
		}
		if (u == null) {
			u = adminRepo.findByAddr(addr);
		}
		return u;
	}
	
	public Student findStudentByEmail(String email) {
		return studentRepo.findByEmail(email);
	}
	
	public Stakeholder findStakeholderByEmail(String email) {
		return stakeholderRepo.findByEmail(email);
	}
	
	public Admin findAdminByEmail(String email) {
		return adminRepo.findByEmail(email);
	}
	
	public void saveUser(User user) {
		user.setUserType(getUserType(user));
		if (user.getClass() == Stakeholder.class) {
			stakeholderRepo.save((Stakeholder)user);
		} else if (user.getClass() == Student.class) {
			studentRepo.save((Student) user);
		} else if (user.getClass() == Admin.class) {
			adminRepo.save((Admin) user);
		}
	}
	
	public String getUserType(User user) {
		if (user.getClass() == Stakeholder.class) {
			return Constants.STAKEHOLDER;
		} else if (user.getClass() == Student.class) {
			return Constants.STUDENT;
		} else if (user.getClass() == Admin.class) {
			return Constants.ADMIN;
		}
		return Constants.EMPTY;
	}
	
	public List<Project> getStakeholderProjects(Stakeholder user) {
		if (user != null) {
			return (List<Project>) user.getProjectIds();
		}
		return new ArrayList<>();
	}
	
	public Project getStudentProject(Student user) {
		if (user != null) {
			return user.getProject();
		}
		return null;
	}
	
	public void saveProject(User user, Project project) {
		if (user != null) {
			if (user.getClass() == Stakeholder.class) {
				Collection<Project> projects = ((Stakeholder) user).getProjectIds();
				projects.add(project);
				((Stakeholder) user).setProjectIds(projects);
				stakeholderRepo.save((Stakeholder) user);
			} else if (user.getClass() == Student.class) {
				((Student) user).setProject(project);
				studentRepo.save((Student) user);
			}
		}
	}

	public Student findByUserId(Long studentId) {
		return studentRepo.findByUserId(studentId);
	}

	public List<User> findAllByProject(Project project) {
		return studentRepo.findAllByProject(project);
		
	}
 }
