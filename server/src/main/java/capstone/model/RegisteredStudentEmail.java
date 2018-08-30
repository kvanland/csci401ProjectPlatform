package capstone.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class RegisteredStudentEmail {
	@Id
	@GeneratedValue
	private long id;
	private String email;
	
	public RegisteredStudentEmail() {
	}
	
	public RegisteredStudentEmail(String email) {
		this.email = email;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
