package capstone.model;

import java.util.Vector;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import capstone.model.users.Student;

@Entity
public class WeeklyReport extends Assignment
{
	/*@Id
	@GeneratedValue
	Long id;
	
	@MapsId("student_id")
	@OneToOne(fetch = FetchType.LAZY)
	private Student student;
	
	@MapsId("project_id")
	@OneToOne(fetch = FetchType.LAZY)
	private Project project;
	
	private Vector<Task> completeTasks;
	private Vector<Task> futureTasks;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}
	public Project getProject() {
		return project;
	}
	public void setProject(Project project) {
		this.project = project;
	}
	public Vector<Task> getCompleteTasks() {
		return completeTasks;
	}
	public void setCompleteTasks(Vector<Task> completeTasks) {
		this.completeTasks = completeTasks;
	}
	public Vector<Task> getFutureTasks() {
		return futureTasks;
	}
	public void setFutureTasks(Vector<Task> futureTasks) {
		this.futureTasks = futureTasks;
	}*/
	
	String name;
	String uscusername;
	String project;
	String reportdate;
	String lastWeekTasksH1;
	String lastWeekTasksH2;
	String lastWeekTasksH3;
	String lastWeekTasksH4;
	String lastWeekTasksH5;
	String lastWeekTasksH6;
	String lastWeekTasksH7;
	
	String lastWeekTasksD1;
	String lastWeekTasksD2;
	String lastWeekTasksD3;
	String lastWeekTasksD4;
	String lastWeekTasksD5;
	String lastWeekTasksD6;
	String lastWeekTasksD7;
	
	String nextWeekTasksH1;
	String nextWeekTasksH2;
	String nextWeekTasksH3;
	String nextWeekTasksH4;
	String nextWeekTasksH5;
	String nextWeekTasksH6;
	String nextWeekTasksH7;
	
	String nextWeekTasksD1;
	String nextWeekTasksD2;
	String nextWeekTasksD3;
	String nextWeekTasksD4;
	String nextWeekTasksD5;
	String nextWeekTasksD6;
	String nextWeekTasksD7;

	@Id
	@GeneratedValue
	private long id;
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUscusername() {
		return uscusername;
	}

	public void setUscusername(String uscusername) {
		this.uscusername = uscusername;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getReportdate() {
		return reportdate;
	}

	public void setReportdate(String reportdate) {
		this.reportdate = reportdate;
	}

	public String getLastWeekTasksH1() {
		return lastWeekTasksH1;
	}

	public void setLastWeekTasksH1(String lastWeekTasksH1) {
		this.lastWeekTasksH1 = lastWeekTasksH1;
	}

	public String getLastWeekTasksH2() {
		return lastWeekTasksH2;
	}

	public void setLastWeekTasksH2(String lastWeekTasksH2) {
		this.lastWeekTasksH2 = lastWeekTasksH2;
	}

	public String getLastWeekTasksH3() {
		return lastWeekTasksH3;
	}

	public void setLastWeekTasksH3(String lastWeekTasksH3) {
		this.lastWeekTasksH3 = lastWeekTasksH3;
	}

	public String getLastWeekTasksH4() {
		return lastWeekTasksH4;
	}

	public void setLastWeekTasksH4(String lastWeekTasksH4) {
		this.lastWeekTasksH4 = lastWeekTasksH4;
	}

	public String getLastWeekTasksH5() {
		return lastWeekTasksH5;
	}

	public void setLastWeekTasksH5(String lastWeekTasksH5) {
		this.lastWeekTasksH5 = lastWeekTasksH5;
	}

	public String getLastWeekTasksH6() {
		return lastWeekTasksH6;
	}

	public void setLastWeekTasksH6(String lastWeekTasksH6) {
		this.lastWeekTasksH6 = lastWeekTasksH6;
	}

	public String getLastWeekTasksH7() {
		return lastWeekTasksH7;
	}

	public void setLastWeekTasksH7(String lastWeekTasksH7) {
		this.lastWeekTasksH7 = lastWeekTasksH7;
	}

	public String getLastWeekTasksD1() {
		return lastWeekTasksD1;
	}

	public void setLastWeekTasksD1(String lastWeekTasksD1) {
		this.lastWeekTasksD1 = lastWeekTasksD1;
	}

	public String getLastWeekTasksD2() {
		return lastWeekTasksD2;
	}

	public void setLastWeekTasksD2(String lastWeekTasksD2) {
		this.lastWeekTasksD2 = lastWeekTasksD2;
	}

	public String getLastWeekTasksD3() {
		return lastWeekTasksD3;
	}

	public void setLastWeekTasksD3(String lastWeekTasksD3) {
		this.lastWeekTasksD3 = lastWeekTasksD3;
	}

	public String getLastWeekTasksD4() {
		return lastWeekTasksD4;
	}

	public void setLastWeekTasksD4(String lastWeekTasksD4) {
		this.lastWeekTasksD4 = lastWeekTasksD4;
	}

	public String getLastWeekTasksD5() {
		return lastWeekTasksD5;
	}

	public void setLastWeekTasksD5(String lastWeekTasksD5) {
		this.lastWeekTasksD5 = lastWeekTasksD5;
	}

	public String getLastWeekTasksD6() {
		return lastWeekTasksD6;
	}

	public void setLastWeekTasksD6(String lastWeekTasksD6) {
		this.lastWeekTasksD6 = lastWeekTasksD6;
	}

	public String getLastWeekTasksD7() {
		return lastWeekTasksD7;
	}

	public void setLastWeekTasksD7(String lastWeekTasksD7) {
		this.lastWeekTasksD7 = lastWeekTasksD7;
	}

	public String getNextWeekTasksH1() {
		return nextWeekTasksH1;
	}

	public void setNextWeekTasksH1(String nextWeekTasksH1) {
		this.nextWeekTasksH1 = nextWeekTasksH1;
	}

	public String getNextWeekTasksH2() {
		return nextWeekTasksH2;
	}

	public void setNextWeekTasksH2(String nextWeekTasksH2) {
		this.nextWeekTasksH2 = nextWeekTasksH2;
	}

	public String getNextWeekTasksH3() {
		return nextWeekTasksH3;
	}

	public void setNextWeekTasksH3(String nextWeekTasksH3) {
		this.nextWeekTasksH3 = nextWeekTasksH3;
	}

	public String getNextWeekTasksH4() {
		return nextWeekTasksH4;
	}

	public void setNextWeekTasksH4(String nextWeekTasksH4) {
		this.nextWeekTasksH4 = nextWeekTasksH4;
	}

	public String getNextWeekTasksH5() {
		return nextWeekTasksH5;
	}

	public void setNextWeekTasksH5(String nextWeekTasksH5) {
		this.nextWeekTasksH5 = nextWeekTasksH5;
	}

	public String getNextWeekTasksH6() {
		return nextWeekTasksH6;
	}

	public void setNextWeekTasksH6(String nextWeekTasksH6) {
		this.nextWeekTasksH6 = nextWeekTasksH6;
	}

	public String getNextWeekTasksH7() {
		return nextWeekTasksH7;
	}

	public void setNextWeekTasksH7(String nextWeekTasksH7) {
		this.nextWeekTasksH7 = nextWeekTasksH7;
	}

	public String getNextWeekTasksD1() {
		return nextWeekTasksD1;
	}

	public void setNextWeekTasksD1(String nextWeekTasksD1) {
		this.nextWeekTasksD1 = nextWeekTasksD1;
	}

	public String getNextWeekTasksD2() {
		return nextWeekTasksD2;
	}

	public void setNextWeekTasksD2(String nextWeekTasksD2) {
		this.nextWeekTasksD2 = nextWeekTasksD2;
	}

	public String getNextWeekTasksD3() {
		return nextWeekTasksD3;
	}

	public void setNextWeekTasksD3(String nextWeekTasksD3) {
		this.nextWeekTasksD3 = nextWeekTasksD3;
	}

	public String getNextWeekTasksD4() {
		return nextWeekTasksD4;
	}

	public void setNextWeekTasksD4(String nextWeekTasksD4) {
		this.nextWeekTasksD4 = nextWeekTasksD4;
	}

	public String getNextWeekTasksD5() {
		return nextWeekTasksD5;
	}

	public void setNextWeekTasksD5(String nextWeekTasksD5) {
		this.nextWeekTasksD5 = nextWeekTasksD5;
	}

	public String getNextWeekTasksD6() {
		return nextWeekTasksD6;
	}

	public void setNextWeekTasksD6(String nextWeekTasksD6) {
		this.nextWeekTasksD6 = nextWeekTasksD6;
	}

	public String getNextWeekTasksD7() {
		return nextWeekTasksD7;
	}

	public void setNextWeekTasksD7(String nextWeekTasksD7) {
		this.nextWeekTasksD7 = nextWeekTasksD7;
	}
}