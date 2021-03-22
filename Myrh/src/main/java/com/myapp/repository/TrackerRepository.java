package com.myapp.repository;

import com.myapp.domain.Tracker;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Tracker entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrackerRepository extends JpaRepository<Tracker, Long> {
}
