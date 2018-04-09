package net.mgm.www.vo;

public class GameComment {
	private int gameid;
	private String userid;
	private String gcomment;
	private int point;
	private String writedate;
	
	public GameComment() {};
	public GameComment(int gameid, String userid, String gcomment, int point, String writedate) {
		super();
		this.gameid = gameid;
		this.userid = userid;
		this.gcomment = gcomment;
		this.point = point;
		this.writedate = writedate;
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
	public String getGcomment() {
		return gcomment;
	}
	public void setGcomment(String gcomment) {
		this.gcomment = gcomment;
	}
	public int getPoint() {
		return point;
	}
	public void setPoint(int point) {
		this.point = point;
	}
	public String getWritedate() {
		return writedate;
	}
	public void setWritedate(String writedate) {
		this.writedate = writedate;
	}
	
	@Override
	public String toString() {
		return "GameComment [gameid=" + gameid + ", userid=" + userid + ", gcomment=" + gcomment + ", point=" + point
				+ ", writedate=" + writedate + "]";
	}	
}
