package com.vlad.helpdeskserver.dto;

import com.vlad.helpdeskserver.entity.Banner;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BannerDTO {
    private Long id;
    private String title;
    private String description;
    private String status;

    public BannerDTO() {}
    public BannerDTO(Banner banner) {
        this.id = banner.getId();
        this.title = banner.getTitle();
        this.description = banner.getDescription();
        this.status = banner.getStatus();
    }
}
