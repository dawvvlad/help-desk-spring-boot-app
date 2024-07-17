package com.vlad.helpdeskserver.service.banner;

import com.vlad.helpdeskserver.dao.banner.BannerRepo;
import com.vlad.helpdeskserver.dto.BannerDTO;
import com.vlad.helpdeskserver.entity.Banner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    }

    @Override
    public void changeStatus(Long id, String status) {

    }

    @Override
    public void changeDescription(Long id, String description) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public BannerDTO findById(Long id) {
        return null;
    }

    @Override
    public List<BannerDTO> findAll() {
        return List.of();
    }
}
