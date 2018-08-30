package capstone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import capstone.model.Ranking;

public interface RankingRepository extends JpaRepository<Ranking, Long> {

}
