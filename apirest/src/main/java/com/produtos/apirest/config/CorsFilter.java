package com.produtos.apirest.config;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsFilter implements Filter {
    public static final String[] ORIGINS = {
            "http://localhost:4200",
            "http://localhost:3000",
            "http://localhost:8080",
            "http://127.0.0.1:4200",
            "http://127.0.0.1:3000",
            "http://127.0.0.1",
    };
    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) resp;
        if (request.getHeader("Origin") != null) {
            for (String origin : ORIGINS) {
                if (origin.equals(request.getHeader("Origin"))) {
                    response.setHeader("Access-Control-Allow-Origin", origin);
                    response.setHeader("Access-Control-Allow-Credentials", "true");
                    if ("OPTIONS".equals(request.getMethod())) {
                        response.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
                        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
                        response.setHeader("Access-Control-Max-Age", "3600");
                        response.setStatus(HttpServletResponse.SC_OK);
                    } else {
                        chain.doFilter(req, resp);
                    }
                }
            }
        } else {
            chain.doFilter(req, resp);
        }
    }
    @Override
    public void destroy() {
    }
    @Override
    public void init(FilterConfig arg0) throws ServletException {
    }
}
