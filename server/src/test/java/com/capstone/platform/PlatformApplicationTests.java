package com.capstone.platform;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import capstone.PlatformApplication;

@RunWith(SpringRunner.class)
@SpringBootTest(classes={PlatformApplication.class})
public class PlatformApplicationTests {

	@Test
	public void contextLoads() {
	}

}
