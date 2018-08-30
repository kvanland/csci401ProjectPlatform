package capstone.service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import capstone.util.Constants;

@Service
@Transactional
public class EmailService {
	@Autowired
	private JavaMailSender mailSender;
	
    public Boolean sendEmail(String subjectLine, String messageBody, String toEmail ) {
    		MimeMessagePreparator preparator = new MimeMessagePreparator() {
            public void prepare(MimeMessage mimeMessage) throws Exception {
                mimeMessage.setRecipient(Message.RecipientType.TO,
                        new InternetAddress(toEmail));
                mimeMessage.setFrom(new InternetAddress(Constants.CSCI401_EMAIL));
                mimeMessage.setSubject(subjectLine);
                mimeMessage.setText(messageBody);
            }
        };

        try {
            this.mailSender.send(preparator);
            return true;
        }
        catch (MailException ex) {
            // simply log it and go on...
            System.err.println(ex.getMessage());
        }
        return false;
	}
}
