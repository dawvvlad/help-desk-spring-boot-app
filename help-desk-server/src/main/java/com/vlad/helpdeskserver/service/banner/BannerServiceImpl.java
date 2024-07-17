package com.vlad.helpdeskserver.service.banner;

import com.vlad.helpdeskserver.dao.banner.BannerRepo;
import com.vlad.helpdeskserver.dto.BannerDTO;
import com.vlad.helpdeskserver.entity.Banner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {

    private final BannerRepo bannerRepo;

    @Autowired
    public BannerServiceImpl(BannerRepo bannerRepo) {
        this.bannerRepo = bannerRepo;
    }

    @Override
    public void create(BannerDTO bannerDTO) {
        Banner banner = new Banner(bannerDTO.getTitle(),
                bannerDTO.getDescription(),
                bannerDTO.getStatus());

        bannerRepo.save(banner);
    }

    @Override
    public void changeTitle(Long id, String title) {
        Banner banner = bannerRepo.find(id);
        banner.setTitle(title);
        bannerRepo.update(banner);
    }

    @Override
    public void changeStatus(Long id, String status) {
        Banner banner = bannerRepo.find(id);
        banner.setTitle(status);
        bannerRepo.update(banner);
    }

    @Override
    public void changeDescription(Long id, String description) {
        Banner banner = bannerRepo.find(id);
        banner.setTitle(description);
        bannerRepo.update(banner);
    }

    @Override
    public void delete(Long id) {
        Banner banner = bannerRepo.find(id);
        bannerRepo.delete(banner);
    }

    @Override
    public BannerDTO findById(Long id) {
        Banner banner = bannerRepo.find(id);
        return new BannerDTO(banner);
    }

    @Override
    public List<BannerDTO> findAll() {
        List<Banner> banners = bannerRepo.findAll();
        List<BannerDTO> bannerDTOs = new ArrayList<>();
        if(banners == null || banners.isEmpty()) {
            return Collections.emptyList();
        } else {
            for(Banner banner : banners) {
                bannerDTOs.add(new BannerDTO(banner));
            }
        }

        return bannerDTOs;
    }
}
