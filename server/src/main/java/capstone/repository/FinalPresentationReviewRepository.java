package capstone.repository;

import javax.transaction.Transactional;

import capstone.model.FinalPresentationReview;

@Transactional
public interface FinalPresentationReviewRepository extends AssignmentBaseRepository<FinalPresentationReview>{

}
