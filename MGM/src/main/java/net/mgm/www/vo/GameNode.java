package net.mgm.www.vo;

/*
 * 
 * 게임쪽 구현 이후 작성
 */

public class GameNode {
	private int gameid;
	private int nodeid;
	private int parentid;
	private String nodename;
	private String nodecontent;
	
	public int getGameid() {
		return gameid;
	}
	public void setGameid(int gameid) {
		this.gameid = gameid;
	}
	public int getNodeid() {
		return nodeid;
	}
	public void setNodeid(int nodeid) {
		this.nodeid = nodeid;
	}
	public int getParentid() {
		return parentid;
	}
	public void setParentid(int parentid) {
		this.parentid = parentid;
	}
	public String getNodename() {
		return nodename;
	}
	public void setNodename(String nodename) {
		this.nodename = nodename;
	}
	public String getNodecontent() {
		return nodecontent;
	}
	public void setNodecontent(String nodecontent) {
		this.nodecontent = nodecontent;
	}
	
	@Override
	public String toString() {
		return "GameNode [gameid=" + gameid + ", nodeid=" + nodeid + ", parentid=" + parentid + ", nodename=" + nodename + "]";
	}	
}
