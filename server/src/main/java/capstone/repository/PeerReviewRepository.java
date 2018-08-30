package capstone.repository;

import javax.transaction.Transactional;

import capstone.model.PeerReview;

@Transactional
public interface PeerReviewRepository extends AssignmentBaseRepository<PeerReview>{

}
