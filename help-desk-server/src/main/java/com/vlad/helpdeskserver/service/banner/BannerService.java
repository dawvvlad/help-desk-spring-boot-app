package com.vlad.helpdeskserver.service.banner;

import com.vlad.helpdeskserver.dto.BannerDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BannerService {
    void create(BannerDTO bannerDTO);
    void changeTitle(Long id, String title);
    void changeStatus(Long id, String status);
    void changeDescription(Long id, String description);
    void delete(Long id);

    BannerDTO findById(Long id);
    List<BannerDTO> findAll();
}
