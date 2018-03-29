package org.test.ajax.vo;

public class CHcustomer {

	int cunum;
	String id;
	String pw;
	String name;
	int cucode;
	String address;
	String phone;
	
	public CHcustomer() {
	}

	public CHcustomer(int cunum, String id, String pw, String name, int cucode, String address,
			String phone) {
		this.cunum = cunum;
		this.id = id;
		this.pw = pw;
		this.name = name;
		this.cucode = cucode;
		this.address = address;
		this.phone = phone;
	}

	public int getCunum() {
		return cunum;
	}

	public void setCunum(int cunum) {
		this.cunum = cunum;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPw() {
		return pw;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCucode() {
		return cucode;
	}

	public void setCucode(int cucode) {
		this.cucode = cucode;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "CHcustomer [cunum=" + cunum + ", id=" + id + ", pw=" + pw + ", name=" + name +
				", cucode=" + cucode + ", address=" + address + ", phone=" + phone + "]";
	}
	

	
}

