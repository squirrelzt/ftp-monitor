package com.ftp.monitor.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

import java.io.IOException;

@Slf4j
public class FtpUtils {

    private FtpUtils() {}
    /**
     * 连接 FTP 服务器
     * @param ftpClient FTPClient对象
     * @param hostname FTP服务器IP地址
     * @param port FTP服务器端口号
     * @param username FTP服务器用户名
     * @param password FTP服务器密码
     */
    private static void connect(FTPClient ftpClient, String hostname, int port, String username, String password){
        if (!ftpClient.isConnected()) {
            try {
                ftpClient.connect(hostname, port);
            } catch (IOException e) {
                LOGGER.error("连接FTP服务器失败：" + e.getMessage(), e);
            }
        }
        try {
            ftpClient.login(username, password);
        } catch (IOException e) {
            LOGGER.error("连接FTP服务器失败：" + e.getMessage(), e);
        }
        int reply = ftpClient.getReplyCode();
        if (!FTPReply.isPositiveCompletion(reply)) {
            disconnect(ftpClient);
            LOGGER.error("登录FTP服务器失败：用户名或密码错误");
        }
    }

    /**
     * 断开FTP服务器
     * @param ftpClient FTPClient对象
     */
    private static void disconnect(FTPClient ftpClient) {
        try {
            if (ftpClient != null && ftpClient.isConnected()) {
                ftpClient.logout();
                ftpClient.disconnect();
            }
        } catch (IOException e) {
            LOGGER.error("断开FTP服务器异常：" + e.getMessage(), e);
        }
    }

    public static FTPFile[] listFiles(String hostname, int port, String username, String password, String ftpPath) {
        FTPFile[] ftpFiles = null;
        FTPClient ftpClient = new FTPClient();

        //连接FTP服务器
        connect(ftpClient,hostname,port,username,password);

        //判断FTP路径是否存在，存在则切换到指定目录
        boolean ftpPathExist = checkFTPDir(ftpClient, ftpPath);
        if (ftpPathExist) {
            //获取FTPFile对象数组
            ftpFiles = getFTPFiles(ftpClient);
        }
        //断开FTP服务器
        disconnect(ftpClient);
        return ftpFiles;
    }

    /**
     * 判断FTP路径是否存在，存在则切换到指定目录
     * @param ftpClient FTPClient对象
     * @param ftpPath FTP服务器目录
     * @return 返回FTP文件夹目录是否存在并切换成功
     */
    public static boolean checkFTPDir(FTPClient ftpClient, String ftpPath) {
        //解决开发环境是Windows，File.seperator是\,当FTP是Linux时，无法切换目录的问题
        ftpPath = ftpPath.replace("\\", "/");
        boolean dirExist = true;
        try {
            dirExist = ftpClient.changeWorkingDirectory(ftpPath);
        } catch (Exception e) {
            dirExist = false;
            LOGGER.error("切换FTP服务器目录异常：" + e.getMessage(), e);
        } finally {
            if (!dirExist) {
                LOGGER.info("切换FTP服务器失败");
                disconnect(ftpClient);
            }
        }
        return dirExist;
    }

    /**
     * 获取FTP文件
     * @param ftpClient FTPClient对象
     * @return 返回FTPFile对象数组
     */
    public static FTPFile[] getFTPFiles(FTPClient ftpClient) {
        FTPFile[] ftpFiles = null;
        //设置被动模式，开通一个端口来接收数据
        ftpClient.enterLocalPassiveMode();
        ftpClient.setControlEncoding("utf-8");
        try {
            //设置二进制传输方式
            ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
            ftpFiles = ftpClient.listFiles();
        } catch (Exception e) {
            LOGGER.error("FTP下载文件异常：" + e.getMessage(), e);
        }
        return ftpFiles;
    }
}
