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
	private String year;
	private String semester;
	
	public RegisteredStudentEmail() {
	}
	
	public RegisteredStudentEmail(String email, String year, String semester) {
		this.email = email;
		this.year = year;
		this.semester = semester;
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

	public String getYear(){
		return year;
	}

	public void setYear(String year){
		this.year = year;
	}

	public String getSemester(){
		return Semester;
	}

	public void setSemester(String semseter){
		this.semseter = semseter;
	}
	
}
