package capstone.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import capstone.model.users.Student;

@Entity
public class PeerReview extends Assignment
{
	
	/*@MapsId("project_id")
	@OneToOne(fetch = FetchType.LAZY)
	private Project project;
	
	@MapsId("student_id")
	@OneToOne(fetch = FetchType.LAZY)
	private Student student;
	
	@MapsId("reviewed_id")
	@OneToOne(fetch = FetchType.LAZY)
	private Student studentReviewed;
	
	private String positiveFeedback;
	private String negativeFeedback;*/
	
	public PeerReview(String uscusername, String uscidnumber, String teammateaddress, String teamcount,
			String positivefeedback, String negativefeedback) {
		super();
		this.uscusername = uscusername;
		this.uscidnumber = uscidnumber;
		this.teammateaddress = teammateaddress;
		this.teamcount = teamcount;
		this.positivefeedback = positivefeedback;
		this.negativefeedback = negativefeedback;
	}

	String uscusername;
	String uscidnumber;
	String teammateaddress;
	String teamcount;
	String positivefeedback;
	String negativefeedback;
	
	public String getUscusername() {
		return uscusername;
	}
	public void setUscusername(String uscusername) {
		this.uscusername = uscusername;
	}
	public String getUscidnumber() {
		return uscidnumber;
	}
	public void setUscidnumber(String uscidnumber) {
		this.uscidnumber = uscidnumber;
	}
	public String getTeammateaddress() {
		return teammateaddress;
	}
	public void setTeammateaddress(String teammateaddress) {
		this.teammateaddress = teammateaddress;
	}
	public String getTeamcount() {
		return teamcount;
	}
	public void setTeamcount(String teamcount) {
		this.teamcount = teamcount;
	}
	public String getPositivefeedback() {
		return positivefeedback;
	}
	public void setPositivefeedback(String positivefeedback) {
		this.positivefeedback = positivefeedback;
	}
	public String getNegativefeedback() {
		return negativefeedback;
	}
	public void setNegativefeedback(String negativefeedback) {
		this.negativefeedback = negativefeedback;
	}
	public void setId(long id) {
		this.id = id;
	}

	@Id
	@GeneratedValue
	private long id;
	public long getId() {
		return id;
	}
	
}
