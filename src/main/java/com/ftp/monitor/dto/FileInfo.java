package com.ftp.monitor.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class FileInfo {
    /**
     * 文件名
     */
    private String filename;

    /**
     * 文件路径
     */
    private String filePath;

    /**
     * 是否是文件夹
     */
    private Boolean directory;

    /**
     * 子文件
     */
    private List<FileInfo> subFiles;

    /**
     * 最近修改时间
     */
    @JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd hh:mm:ss")
    private Date updateTime;
}
