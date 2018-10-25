package capstone.config;

import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;

import capstone.model.users.User;
import capstone.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenProvider {
	private final Logger log = LoggerFactory.getLogger(JwtTokenProvider.class);
	
	  private String secretKey = "secretkey";
	  private long validityInMilliseconds = 3600000 * 24;

		@Autowired
		private UserService userService;

	  @PostConstruct
	  protected void init() {
	    secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	  }

	  public String createToken(String userEmail, String userType) {

	    Claims claims = Jwts.claims().setSubject(userEmail);
	    claims.put("auth", userType);

	    Date now = new Date();
	    Date validity = new Date(now.getTime() + validityInMilliseconds);

	    return Jwts.builder()
	        .setClaims(claims)
	        .setIssuedAt(now)
	        .setExpiration(validity)
	        .signWith(SignatureAlgorithm.HS256, secretKey)
	        .compact();
	  }

	  public Authentication getAuthentication(String token) {
	    User user = userService.findUserByEmail(getEmail(token));
	    UserDetails userDetails = org.springframework.security.core.userdetails.User
	    		.withUsername(user.getEmail())
	    		.password(user.getPassword())
	    		.authorities(user.getUserType())
	    		.accountExpired(false)
	    		.accountLocked(false)
	    		.credentialsExpired(false)
	    		.disabled(false)
	    		.build();
	    return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	  }

	  public String getEmail(String token) {
	    return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	  }

	  public String resolveToken(HttpServletRequest req) {
	    String bearerToken = req.getHeader("Authorization");
	    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
	      return bearerToken.substring(7, bearerToken.length());
	    }
	    return null;
	  }


		public boolean validateToken(String token) {
			try {
				Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
				return true;
			} catch (SignatureException e) {
				log.info("Invalid JWT signature.");
				log.trace("Invalid JWT signature trace: {}", e);
			} catch (MalformedJwtException e) {
				log.info("Invalid JWT token.");
				log.trace("Invalid JWT token trace: {}", e);
			} catch (ExpiredJwtException e) {
				log.info("Expired JWT token.");
				log.trace("Expired JWT token trace: {}", e);
			} catch (UnsupportedJwtException e) {
				log.info("Unsupported JWT token.");
				log.trace("Unsupported JWT token trace: {}", e);
			} catch (IllegalArgumentException e) {
				log.info("JWT token compact of handler are invalid.");
				log.trace("JWT token compact of handler are invalid trace: {}", e);
			}
			return false;
		}
}
