package com.myapp.repository;

import com.myapp.domain.CongeData;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CongeData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CongeDataRepository extends JpaRepository<CongeData, Long> {
}
