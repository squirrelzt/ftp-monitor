package com.ftp.monitor.common;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@Component
public class CorsFilter implements Filter {

  @Override
  public void destroy() {

  }

  @SuppressWarnings({ "rawtypes", "unchecked" })
  @Override
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
      throws IOException, ServletException {
    HttpServletResponse response = (HttpServletResponse) res;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
    chain.doFilter(req, res);
    Map map = new HashMap();
    Enumeration paramNames = req.getParameterNames();
    while (paramNames.hasMoreElements()) {
      String paramName = (String) paramNames.nextElement();
      String[] paramValues = req.getParameterValues(paramName);
      if (paramValues.length == 1) {
        String paramValue = paramValues[0];
        if (paramValue.length() != 0) {
          map.put(paramName, paramValue);
        }
      }
    }

  }

  @Override
  public void init(FilterConfig arg0) throws ServletException {

  }

}
