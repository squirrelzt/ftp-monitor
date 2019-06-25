package com.ftp.monitor.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/editor")
public class CKEditorController {

    @RequestMapping("/uploadform")
//    public String uploadRichTextEditorContent(@RequestBody Object content) {
    public String uploadRichTextEditorContent(@RequestParam String content) {
        System.out.println("----------------");
        System.out.println(content);
        return content;
    }
}
