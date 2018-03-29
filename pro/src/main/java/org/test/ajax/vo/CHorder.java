package org.test.ajax.vo;

public class CHorder {

	private int orderNum;
	private int ordertype;
	private String odId;
	private String indate;
	private String deliveredDate;
	
	public CHorder() {
	}

	public CHorder(int orderNum, int ordertype, String odId, String indate, String deliveredDate) {
		super();
		this.orderNum = orderNum;
		this.ordertype = ordertype;
		this.odId = odId;
		this.indate = indate;
		this.deliveredDate = deliveredDate;
	}

	
	public int getOrdertype() {
		return ordertype;
	}

	public void setOrdertype(int ordertype) {
		this.ordertype = ordertype;
	}

	public int getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(int orderNum) {
		this.orderNum = orderNum;
	}

	public String getOdId() {
		return odId;
	}

	public void setOdId(String odId) {
		this.odId = odId;
	}

	public String getIndate() {
		return indate;
	}

	public void setIndate(String indate) {
		this.indate = indate;
	}

	public String getDeliveredDate() {
		return deliveredDate;
	}

	public void setDeliveredDate(String deliveredDate) {
		this.deliveredDate = deliveredDate;
	}

	@Override
	public String toString() {
		return "CHorder [orderNum=" + orderNum + ", ordertype="+ ordertype +", odId=" + odId
				+ ", indate=" + indate + ", deliveredDate=" + deliveredDate + "]";
	}

	
	
	
	
}
