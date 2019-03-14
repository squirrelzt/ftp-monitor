package com.ftp.monitor.service;

import com.ftp.monitor.dto.FileInfo;

import java.util.List;

public interface FtpMonitorService {

    List<FileInfo> listFtpFiles();
}
