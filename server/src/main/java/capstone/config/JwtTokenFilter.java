package capstone.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

/*
 * JwtFilter implements JWT authentication on the server side. 
 * This filter checks that the request has a valid token.
 */
public class JwtTokenFilter extends GenericFilterBean {

	  private JwtTokenProvider jwtTokenProvider;

	  public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
	    this.jwtTokenProvider = jwtTokenProvider;
	  }
	
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
			throws IOException, ServletException {

		HttpServletRequest httpServletRequest = (HttpServletRequest) req;
		String jwt = jwtTokenProvider.resolveToken(httpServletRequest);

		if (StringUtils.hasText(jwt) && jwtTokenProvider.validateToken(jwt)) {
			Authentication authentication = StringUtils.hasText(jwt) ? jwtTokenProvider.getAuthentication(jwt) : null;
            SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		
		filterChain.doFilter(req, res);
	}
}