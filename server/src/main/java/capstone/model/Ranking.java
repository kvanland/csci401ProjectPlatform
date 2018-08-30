package capstone.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Ranking {
	@Id @GeneratedValue Long rankingId;
	Long studentId;
	int projectId;
	int rank;
	
	public Ranking() {
	}
	public Ranking(Long studentId, int projectId, int rank) {
		this.studentId = studentId;
		this.projectId = projectId;
		this.rank = rank;
	}
	
	public Long getRankingId() {
		return rankingId;
	}

	public void setRankingId(Long rankingId) {
		this.rankingId = rankingId;
	}

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public int getProjectId() {
		return projectId;
	}

	public void setProjectId(int projectId) {
		this.projectId = projectId;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}
}
