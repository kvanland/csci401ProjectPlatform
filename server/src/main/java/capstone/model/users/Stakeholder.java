package capstone.model.users;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import capstone.model.Project;

@Entity
public class Stakeholder extends User {
	
	private String organization; //only valid if userType = Stakeholder
	
	@OneToMany(targetEntity=Project.class)
	private Collection<Project> projectIds;
	//@OneToOne(targetEntity=Project.class)
	//private Project project;
	
	private int avgRating;
	
	public String getOrganization() {
		return organization;
	}
	public void setOrganization(String organization) {
		this.organization = organization;
	}
	public void setProjectIds(Collection<Project> projectIds) {
		this.projectIds = projectIds;
	}
	public Collection<Project> getProjectIds() {
		return projectIds;
	}
	/*public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}*/
	public int getAvgRating() {
		return avgRating;
	}
	public void setAvgRating(int avgRating) {
		this.avgRating = avgRating;
	}
}
