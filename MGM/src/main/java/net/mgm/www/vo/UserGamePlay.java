package net.mgm.www.vo;

public class UserGamePlay {
	private String userid;
	private int gameid;
	private String lastdate;
	private int nodeid;
	
	public UserGamePlay() {};
	public UserGamePlay(String userid, int gameid, String lastdate, int nodeid) {
		super();
		this.userid = userid;
		this.gameid = gameid;
		this.lastdate = lastdate;
		this.nodeid = nodeid;
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
	public int getNodeid() {
		return nodeid;
	}
	public void setNodeid(int nodeid) {
		this.nodeid = nodeid;
	}
	
	@Override
	public String toString() {
		return "UserGamePlay [userid=" + userid + ", gameid=" + gameid + ", lastdate=" + lastdate + ", nodeid="
				+ nodeid + "]";
	}
}
