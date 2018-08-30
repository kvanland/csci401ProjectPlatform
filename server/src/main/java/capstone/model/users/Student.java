package capstone.model.users;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import capstone.model.Project;

@Entity
public class Student extends User {
	
	public String uscid; // only valid if userType = Student
	public String semester;
	
	@OneToOne(targetEntity=Project.class)
	Project project;
	
	@Transient
	public Map<String, Integer> rankings;
	@Transient
	public List<String> orderedRankings;
	
	public Student() {
		setRankings(new HashMap<String, Integer>());
		setOrderedRankings(new Vector<String>());
	}
	
	public Student(Student orig) {
		this.setFirstName(orig.getFirstName());
		this.setLastName(orig.getLastName());
		this.setEmail(orig.getEmail());
		this.setUserId(orig.getUserId());
		this.project = orig.project;
		this.rankings = orig.rankings;
		this.orderedRankings = orig.orderedRankings;
	}

	public String toString() {
		return ("Student #" + this.uscid + ": '" + this.getFirstName() + "' | " + this.getRankings());
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}
	
	public Map<String, Integer> getRankings() {
		return rankings;
	}

	public void setRankings(Map<String, Integer> rankings) {
		this.rankings = rankings;
	}

	public List<String> getOrderedRankings() {
		return orderedRankings;
	}

	public void setOrderedRankings(List<String> orderedRankings) {
		this.orderedRankings = orderedRankings;
	}
}
