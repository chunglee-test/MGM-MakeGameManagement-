package net.mgm.www.vo;

public class Game {
	private int gameid;
	private String userid;
	private String gamename;
	private String gamecontent;
	private String isopen;
	private String opendate;
	
	public Game() {}
	public Game(int gameid, String userid, String gamename, String gamecontent, 
			String isopen, String opendate) {
		this.gameid = gameid;
		this.userid = userid;
		this.gamename = gamename;
		this.gamecontent = gamecontent;		
		this.isopen = isopen;
		this.opendate = opendate;
	}
	
	public int getGameid() {
		return gameid;
	}
	public void setGameid(int gameid) {
		this.gameid = gameid;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getGamename() {
		return gamename;
	}
	public void setGamename(String gamename) {
		this.gamename = gamename;
	}
	public String getGamecontent() {
		return gamecontent;
	}
	public void setGamecontent(String gamecontent) {
		this.gamecontent = gamecontent;
	}
	public String isIsopen() {
		return isopen;
	}
	public void setIsopen(String isopen) {
		this.isopen = isopen;
	}
	public String getOpendate() {
		return opendate;
	}
	public void setOpendate(String opendate) {
		this.opendate = opendate;
	}
	
	@Override
	public String toString() {
		return "Game [gameid=" + gameid + ", userid=" + userid + ", gamename=" + gamename + ", gamecontent="
				+ gamecontent + ", isopen=" + isopen + ", opendate=" + opendate + "]";
	}	
}
