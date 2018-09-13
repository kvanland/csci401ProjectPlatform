package capstone.controller;

import java.util.Collection;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import capstone.model.RegisteredStudentEmail;
import capstone.model.users.Admin;
import capstone.model.users.Stakeholder;
import capstone.model.users.Student;
import capstone.model.users.User;
import capstone.repository.RegisteredStudentEmailRepository;
import capstone.service.EmailService;
import capstone.service.UserService;
import capstone.util.Constants;
import capstone.util.EncryptPassword;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/users")
public class UserController 
{
	@Autowired
	private UserService userService;
	@Autowired
	private RegisteredStudentEmailRepository regRepo;
	@Autowired
	private EmailService emailService;
	
	public UserController()
	{
	}
	
	@GetMapping("/init")
	public String setAdmin() {
		Admin admin = new Admin();
		admin.setFirstName("Jeffrey");
		admin.setLastName("Miller");
		admin.setEmail("admin@usc.edu");
		admin.setPassword(EncryptPassword.encryptPassword("admin"));
		userService.saveUser(admin);
		return Constants.SUCCESS;
	}
	
	@GetMapping("")
	@CrossOrigin(origins = "http://localhost:3000")
	public Collection<User> getUsers()
	{
		return userService.getUsers();
	}
	
	@GetMapping("/{email:.+}")
	@CrossOrigin(origins = "http://localhost:3000")
	public User getUser(@PathVariable("email") String email)
	{
		System.out.println(email);
		return userService.findUserByEmail(email);
	}
	
	@GetMapping("/stakeholders")
	@CrossOrigin(origins = "http://localhost:3000")
	public Collection<Stakeholder> getStakeholders() {
		return userService.getStakeholders();
	}
	
	@GetMapping("/students")
	@CrossOrigin(origins = "http://localhost:3000")
	public Collection<Student> getStudents() {
		return userService.getStudents(); 
	}
	
	@PostMapping("/update-info")
	@CrossOrigin(origins = "http://localhost:3000")
	public void updateUserInfo(@RequestBody Map<String, String> info) {
		String originalEmail = info.get(Constants.ORIGINAL_EMAIL);
		String newEmail = info.get(Constants.EMAIL);
		String firstName = info.get(Constants.FIRST_NAME);
		String lastName = info.get(Constants.LAST_NAME);
		String userType = info.get(Constants.USER_TYPE);
		
		User user = findUser(originalEmail);
		user.setFirstName(firstName);
		user.setLastName(lastName);
		user.setEmail(newEmail);
		user.setUserType(userType);
		userService.saveUser(user);
	}
	
	public User findUser(String email) {
		return userService.findUserByEmail(email);
	}
	public User findUserByAddr(String addr) {
		return userService.findUserByAddr(addr);
	}
	
	/* Registration */
	
	// Admin registration
	@PostMapping("/admin-registration")
	@CrossOrigin(origins = "http://localhost:3000")
	public @ResponseBody String adminRegistrationAttempt(@RequestBody Map<String, String> info) {
		String email = info.get(Constants.EMAIL);
		String firstName = info.get(Constants.FIRST_NAME);
		String lastName = info.get(Constants.LAST_NAME);
		String phone = info.get(Constants.PHONE);
		String encryptedPassword = EncryptPassword.encryptPassword(info.get(Constants.PASSWORD));
		
		// Check if email is a registered student email and not already registered
		if (regRepo.findByEmail(email) != null && 
				userService.findStudentByEmail(email) == null) {
			Admin admin = new Admin();
			admin.setFirstName(firstName);
			admin.setLastName(lastName);
			admin.setEmail(email);
			admin.setPhone(phone);
			admin.setPassword(encryptedPassword);
			admin.setUserType(Constants.ADMIN);
			userService.saveUser(admin);
			System.out.println("New admin created");
			return Constants.SUCCESS;
		}
		return Constants.EMPTY;
	}
	
	// Student registration
	@PostMapping("/student-registration")
	@CrossOrigin(origins = "http://localhost:3000")
	public @ResponseBody BodyBuilder studentRegistrationAttempt(@RequestBody Map<String, String> info) {
		String email = info.get(Constants.EMAIL);
		String firstName = info.get(Constants.FIRST_NAME);
		String lastName = info.get(Constants.LAST_NAME);
		String phone = info.get(Constants.PHONE);
		String encryptedPassword = EncryptPassword.encryptPassword(info.get(Constants.PASSWORD));

		System.out.println("this endpoint has been reached");
		System.out.println(email);
		System.out.println(firstName);
		System.out.println(lastName);
		System.out.println(phone);
		System.out.println(encryptedPassword);
		
		// Check if email is a registered student email and not already registered
		
		if (regRepo.findByEmail(email) != null && userService.findStudentByEmail(email) == null) {
			Student s = new Student();
			s.setFirstName(firstName);
			s.setLastName(lastName);
			s.setEmail(email);
			s.setPhone(phone);
			s.setPassword(encryptedPassword);
			s.setUserType(Constants.STUDENT);
			userService.saveUser(s);
			System.out.println("New student created");
			return ResponseEntity.ok();
		}
		return ResponseEntity.badRequest();
	}
	
	// Stakeholder registration
	@PostMapping("/stakeholder-registration")
	@CrossOrigin(origins = "http://localhost:3000")
	public @ResponseBody String stakeholderRegistrationAttempt(@RequestBody Map<String, String> info) {
		System.out.println("Start reg");
		String email = info.get(Constants.EMAIL);
		String name = info.get(Constants.FIRST_NAME);
		String lastName = info.get(Constants.LAST_NAME);
		String phone = info.get(Constants.PHONE);
		String companyName = info.get(Constants.COMPANY);
		String encryptedPassword = EncryptPassword.encryptPassword(info.get(Constants.PASSWORD));
		
		// Check if email has already been registered
		if (userService.findStakeholderByEmail(email) == null) {
			Stakeholder s = new Stakeholder();
			s.setFirstName(name);
			s.setLastName(lastName);
			s.setEmail(email);
			s.setPhone(phone);
			s.setOrganization(companyName);
			s.setPassword(encryptedPassword);
			s.setUserType(Constants.STAKEHOLDER);
			userService.saveUser(s);
			System.out.println("New stakeholder created");
			return Constants.SUCCESS;
		}
		return Constants.EMPTY;
	}
	
	// Admin can register student emails and send an invitation to the platform
	@RequestMapping(value = "/student-emails-registration",consumes= "application/json",produces= "application/json", method = RequestMethod.POST)
	@CrossOrigin(origins = "http://localhost:3000")
	public void studentEmailRegistrationAttempt(@RequestBody Map<String, String> emailsData)
	{
		System.out.println(emailsData);
		System.out.println("Received HTTP POST");
		
		String[] emailsArray = emailsData.get(Constants.EMAILS).split("\n");
		
		for(String e : emailsArray)
		{
			// Save the email to registered student email table
			regRepo.save(new RegisteredStudentEmail(e));
			// Send an email invitation
			emailService.sendEmail("401 Platform Invite", "Congratulations! \nPlease sign up using the following link. \n \nlocalhost:3000/register/student", e);
			System.out.println("Sent invite to: " + e);
		}
	}
	
	/* Login */
	
	@PostMapping("/login")
	@CrossOrigin(origins = "http://localhost:3000")
	public String login(@RequestBody User login) throws ServletException {

	    String jwtToken = "";

	    if (login.getEmail() == null || login.getPassword() == null) {
	        return "";
	    }

	    String email = login.getEmail();
	    String password = login.getPassword();

	    User user = userService.findUserByEmail(email);

	    if (user == null) {
	        throw new ServletException("Invalid login");
	    }

	    String pwd = user.getPassword();

	    if (!EncryptPassword.checkPassword(password, pwd)) {
	        throw new ServletException("Invalid login");
	    }
	    
	    String userType = userService.getUserType(user);

	    jwtToken = Jwts.builder().setSubject(email).claim("roles", "user").setIssuedAt(new Date())
	            .signWith(SignatureAlgorithm.HS256, "secretkey").compact();
	    // System.out.println("Jwt: " + jwtToken);
	    return jwtToken + "," + userType;
	}
}
