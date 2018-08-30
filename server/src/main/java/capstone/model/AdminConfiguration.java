package capstone.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;



@Entity
public class AdminConfiguration {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	public Date deliverableOneDate;
	public Date deliverableTwoDate;
	public Date deliverableThreeDate;
	public Date deliverableFourDate;
	public Date deliverableFiveDate;
	public Date deliverableSixDate;
	public Date deliverableSevenDate;
	public Long numRankedProjects;
	
	@OneToMany(targetEntity=Project.class, cascade=CascadeType.MERGE)
	public List<Project> assignment; 
	
	public AdminConfiguration() {
		this.assignment = new ArrayList<>();
	}
	public List<Project> getAssignment() {
		return assignment;
	}
	public void setAssignment(List<Project> assignment) {
		this.assignment = assignment;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getDeliverableOneDate() {
		return deliverableOneDate;
	}
	public void setDeliverableOneDate(Date deliverableOneDate) {
		this.deliverableOneDate = deliverableOneDate;
	}
	public Date getDeliverableTwoDate() {
		return deliverableTwoDate;
	}
	public void setDeliverableTwoDate(Date deliverableTwoDate) {
		this.deliverableTwoDate = deliverableTwoDate;
	}
	public Date getDeliverableThreeDate() {
		return deliverableThreeDate;
	}
	public void setDeliverableThreeDate(Date deliverableThreeDate) {
		this.deliverableThreeDate = deliverableThreeDate;
	}
	public Date getDeliverableFourDate() {
		return deliverableFourDate;
	}
	public void setDeliverableFourDate(Date deliverableFourDate) {
		this.deliverableFourDate = deliverableFourDate;
	}
	public Date getDeliverableFiveDate() {
		return deliverableFiveDate;
	}
	public void setDeliverableFiveDate(Date deliverableFiveDate) {
		this.deliverableFiveDate = deliverableFiveDate;
	}
	public Date getDeliverableSixDate() {
		return deliverableSixDate;
	}
	public void setDeliverableSixDate(Date deliverableSixDate) {
		this.deliverableSixDate = deliverableSixDate;
	}
	public Date getDeliverableSevenDate() {
		return deliverableSevenDate;
	}
	public void setDeliverableSevenDate(Date deliverableSevenDate) {
		this.deliverableSevenDate = deliverableSevenDate;
	}
	public Long getNumProjectRankings() {
		return numRankedProjects;
	}
	public void setNumProjectRankings(Long numProjectRankings) {
		this.numRankedProjects = numProjectRankings;
	}
}
