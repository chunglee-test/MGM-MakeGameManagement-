package net.mgm.www.vo;

public class UserGamePlay {
	private String userid;
	private int gameid;
	private String lastdate;
	private int gamenodeid;
	
	public UserGamePlay() {};
	public UserGamePlay(String userid, int gameid, String lastdate, int gamenodeid) {
		super();
		this.userid = userid;
		this.gameid = gameid;
		this.lastdate = lastdate;
		this.gamenodeid = gamenodeid;
	}
	
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public int getGameid() {
		return gameid;
	}
	public void setGameid(int gameid) {
		this.gameid = gameid;
	}
	public String getLastdate() {
		return lastdate;
	}
	public void setLastdate(String lastdate) {
		this.lastdate = lastdate;
	}
	public int getGamenodeid() {
		return gamenodeid;
	}
	public void setGamenodeid(int gamenodeid) {
		this.gamenodeid = gamenodeid;
	}
	
	@Override
	public String toString() {
		return "UserGamePlay [userid=" + userid + ", gameid=" + gameid + ", lastdate=" + lastdate + ", gamenodeid="
				+ gamenodeid + "]";
	}
}
