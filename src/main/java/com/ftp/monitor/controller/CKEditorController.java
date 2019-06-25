package com.ftp.monitor.controller;

import com.ftp.monitor.dto.CkEditorUploadVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/editor")
public class CKEditorController {

    @Value("${upload.upload-path}")
    private String uploadPath;

    @RequestMapping("/uploadform")
//    public String uploadRichTextEditorContent(@RequestBody Object content) {
    public String uploadRichTextEditorContent(@RequestParam String content) {
        System.out.println("----------------");
        System.out.println(content);
        return content;
    }

    @RequestMapping("/uploadImage")
    public CkEditorUploadVO uploadImage(@RequestParam("file") MultipartFile file) {
        CkEditorUploadVO vo = new CkEditorUploadVO();
        try {
            String filename = file.getOriginalFilename();
            String path = ResourceUtils.getURL("").getPath() + File.separator + uploadPath + File.separator + filename;
            File dest = new File(path);
            file.transferTo(dest);
            vo.setUploaded(Boolean.TRUE);
            vo.setUrl("http://127.0.0.1:8080/" + filename);
        } catch (Exception e) {
            vo.setUploaded(Boolean.FALSE);
            LOGGER.error("" + e);
        }
        return vo;
    }
}
