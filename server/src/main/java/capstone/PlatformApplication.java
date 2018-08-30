package capstone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import capstone.controller.JwtFilter;

@SpringBootApplication
public class PlatformApplication {
	@Bean
	public FilterRegistrationBean jwtFilter() {
		final FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		registrationBean.setFilter(new JwtFilter());
		registrationBean.addUrlPatterns("/users");
		
		return registrationBean;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(PlatformApplication.class, args);
	}
}
