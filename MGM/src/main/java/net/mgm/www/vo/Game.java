package net.mgm.www.vo;

public class Game {
	private int gameid;
	private String userid;
	private String nick;
	private String gamename;
	private String gamecontent;
	private String gameprofile;
	private String isopen;
	private String opendate;
	private String point;

	public Game() {};
	public Game(int gameid, String nick, String gamename, String gamecontent, String gameprofile, String isopen,
			String opendate) {
		super();
		this.gameid = gameid;
		this.nick = nick;
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
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
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
	public String getPoint() {
		return point;
	}
	public void setPoint(String point) {
		this.point = point;
	}
	@Override
	public String toString() {
		return "Game [gameid=" + gameid + ", nick=" + nick + ", gamename=" + gamename + ", gamecontent="
				+ gamecontent + ", gameprofile=" + gameprofile + ", isopen=" + isopen + ", opendate=" + opendate + "]";
	}	
}
