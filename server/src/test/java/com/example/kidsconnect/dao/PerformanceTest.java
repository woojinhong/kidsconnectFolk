package com.example.kidsconnect.dao;

import com.example.kidsconnect.dao.TherapistInfoRepository;
import com.example.kidsconnect.domain.TherapistInfo;
import com.example.kidsconnect.domain.test.AgeRange;
import com.example.kidsconnect.domain.test.Certificate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

@SpringBootTest
@ActiveProfiles("test")
public class PerformanceTest {

    @Autowired
    private TherapistInfoRepository therapistInfoRepository;
    @Autowired
    private CertificateRepository certificateRepository;
    @Autowired
    private AgeRangeRepository ageRangeRepository;

    @Test
    public void testInsertPerformanceElementCollection() {
        long startTime = System.nanoTime();

        for (int i = 0; i < 1000; i++) {
            TherapistInfo therapistInfo = new TherapistInfo();
            // 기타 속성 설정
            therapistInfo.setCertificate(List.of("Cert1", "Cert2", "Cert3"));
            therapistInfo.setAgeRange(List.of("0-10", "11-20"));
            therapistInfoRepository.save(therapistInfo);
        }

        long endTime = System.nanoTime();
        long duration = (endTime - startTime) / 1_000_000; // milliseconds
        System.out.println("ElementCollection Insert Duration: " + duration + " ms");
    }

    @Test
    public void testInsertPerformanceSeparateTables() {
        long startTime = System.nanoTime();

        for (int i = 0; i < 1000; i++) {
            TherapistInfo therapistInfo = new TherapistInfo();
            // 기타 속성 설정
            therapistInfoRepository.save(therapistInfo);

            List<Certificate> certificates = new ArrayList<>();
            certificates.add(new Certificate(null, "Cert1", therapistInfo));
            certificates.add(new Certificate(null, "Cert2", therapistInfo));
            certificates.add(new Certificate(null, "Cert3", therapistInfo));
            certificateRepository.saveAll(certificates);

            List<AgeRange> ageRanges = new ArrayList<>();
            ageRanges.add(new AgeRange(null, "0-10", therapistInfo));
            ageRanges.add(new AgeRange(null, "11-20", therapistInfo));
            ageRangeRepository.saveAll(ageRanges);
        }

        long endTime = System.nanoTime();
        long duration = (endTime - startTime) / 1_000_000; // milliseconds
        System.out.println("SeparateTables Insert Duration: " + duration + " ms");
    }
}