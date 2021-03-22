package com.myapp.repository;

import com.myapp.domain.Recuperation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Recuperation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecuperationRepository extends JpaRepository<Recuperation, Long> {
}
