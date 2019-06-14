package com.wf.ew;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.wf.jwtp.configuration.EnableJwtPermission;

@EnableJwtPermission
@SpringBootApplication
public class EasyWebApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(EasyWebApplication.class, args);
    }

    /**
     * 若需要打成 war 包，则需要写一个类继承 {@link SpringBootServletInitializer} 并重写 {@link SpringBootServletInitializer#configure(SpringApplicationBuilder)}
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(EasyWebApplication.class);
    }
}
