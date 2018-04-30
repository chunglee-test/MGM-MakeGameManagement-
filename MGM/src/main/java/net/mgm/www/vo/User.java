package net.mgm.www.vo;

public class User {
	private String userid;
	private String userpw;
	private String nick;
	private String email;
	private String signup;
	private String userprofile;
	
	public User() {}
	public User(String userid, String userpw, String nick, String email) {
		this.userid = userid;
		this.userpw = userpw;
		this.nick = nick;
		this.email = email;
	}
	public User(String userid, String userpw, String nick, String email, String signup) {
		this.userid = userid;
		this.userpw = userpw;
		this.nick = nick;
		this.email = email;
		this.signup = signup;
	}
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getUserpw() {
		return userpw;
	}
	public void setUserpw(String userpw) {
		this.userpw = userpw;
	}
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSignup() {
		return signup;
	}
	public void setSignup(String signup) {
		this.signup = signup;
	}
	public String getUserprofile() {
		return userprofile;
	}
	public void setUserprofile(String userprofile) {
		this.userprofile = userprofile;
	}
	
	@Override
	public String toString() {
		return "User [userid=" + userid + ", userpw=" + userpw + ", nick=" + nick + ", email=" + email + ", signup="
				+ signup + "]";
	}	
}
