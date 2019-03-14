package com.ftp.monitor.service.impl;

import com.ftp.monitor.dto.FileInfo;
import com.ftp.monitor.service.FtpMonitorService;
import com.ftp.monitor.util.FtpUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.net.ftp.FTPFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class FtpMonitorServiceImpl implements FtpMonitorService {

    @Value("${ftp.hostname}")
    private String hostname;
    @Value("${ftp.port}")
    private int port;
    @Value("${ftp.username}")
    private String username;
    @Value("${ftp.password}")
    private String password;
    @Value("${ftp.ftpBasePath}")
    private String ftpBasePath;

    @Override
    public List<FileInfo> listFtpFiles() {
        return listFiles(ftpBasePath);
    }

    private List<FileInfo> listFiles(String ftpPath) {
        List<FileInfo> list = new ArrayList<>();
        FTPFile[] ftpFiles = FtpUtils.listFiles(hostname, port, username, password, ftpPath);
        for (int i = 0; i < ftpFiles.length; i ++) {
            FTPFile ftpFile = ftpFiles[i];
            FileInfo fileInfo = new FileInfo();
            String filename = ftpFile.getName();
            fileInfo.setFilename(filename);
            Boolean directory = ftpFile.isDirectory();
            fileInfo.setDirectory(directory);
            Date updateTime = ftpFile.getTimestamp().getTime();
            fileInfo.setUpdateTime(updateTime);
            if (directory) {
                List<FileInfo> subFiles = listFiles(ftpPath + File.separator + filename);
                fileInfo.setSubFiles(subFiles);
            }
            list.add(fileInfo);
        }
        return list;
    }
}
