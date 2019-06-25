package com.ftp.monitor.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CkEditorUploadVO implements Serializable {
    private Boolean uploaded;

    private String url;
}
