package net.mgm.www.vo;

public class maptest {
	private String mapname;

	public maptest() {
		super();
	}

	public maptest(String mapname) {
		super();
		this.mapname = mapname;
	}

	public String getMapname() {
		return mapname;
	}

	public void setMapname(String mapname) {
		this.mapname = mapname;
	}

	@Override
	public String toString() {
		return "maptest [mapname=" + mapname + "]";
	}
	
	
}
