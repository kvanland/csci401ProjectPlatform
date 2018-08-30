package capstone.util;

import org.jasypt.util.password.StrongPasswordEncryptor;

public class EncryptPassword {
	public static String encryptPassword(String textPassword)
	{
		String encryptedPassword;
		StrongPasswordEncryptor bte = new StrongPasswordEncryptor();
		encryptedPassword = bte.encryptPassword(textPassword);
		return encryptedPassword;
	}
	
	public static Boolean checkPassword(String plainPassword, String encryptedPassword)
	{
		StrongPasswordEncryptor bte = new StrongPasswordEncryptor();
		return bte.checkPassword(plainPassword,encryptedPassword);
	}
}
