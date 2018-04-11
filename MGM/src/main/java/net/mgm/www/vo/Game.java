package net.mgm.www.vo;

public class Game {
	private int gameid;
	private String username;
	private String gamename;
	private String gamecontent;
	private String gameprofile;
	private String isopen;
	private String opendate;

	public Game() {};
	public Game(int gameid, String username, String gamename, String gamecontent, String gameprofile, String isopen,
			String opendate) {
		super();
		this.gameid = gameid;
		this.username = username;
		this.gamename = gamename;
		this.gamecontent = gamecontent;
		this.gameprofile = gameprofile;
		this.isopen = isopen;
		this.opendate = opendate;
	}
	
	public int getGameid() {
		return gameid;
	}
	public void setGameid(int gameid) {
		this.gameid = gameid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
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
	public String getGameprofile() {
		return gameprofile;
	}
	public void setGameprofile(String gameprofile) {
		this.gameprofile = gameprofile;
	}
	public String getIsopen() {
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
		return "Game [gameid=" + gameid + ", username=" + username + ", gamename=" + gamename + ", gamecontent="
				+ gamecontent + ", gameprofile=" + gameprofile + ", isopen=" + isopen + ", opendate=" + opendate + "]";
	}	
}
