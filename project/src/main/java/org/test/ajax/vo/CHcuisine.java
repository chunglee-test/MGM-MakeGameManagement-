package org.test.ajax.vo;

public class CHcuisine {

	private int cscode;
	private String csName;
	private String receipe;
	private String theme;
	private String ingredient;

	public CHcuisine() {
	}

	public CHcuisine(int cscode, String csName, String receipe, String theme, String ingredient) {
		super();
		this.cscode = cscode;
		this.csName = csName;
		this.receipe = receipe;
		this.theme = theme;
		this.ingredient = ingredient;
	}

	public int getCscode() {
		return cscode;
	}

	public void setCscode(int cscode) {
		this.cscode = cscode;
	}

	public String getCsName() {
		return csName;
	}

	public void setCsName(String csName) {
		this.csName = csName;
	}

	public String getReceipe() {
		return receipe;
	}

	public void setReceipe(String receipe) {
		this.receipe = receipe;
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	public String getIngredient() {
		return ingredient;
	}

	public void setIngredient(String ingredient) {
		this.ingredient = ingredient;
	}

	@Override
	public String toString() {
		return "CHcuisine [cscode=" + cscode + ", csName=" + csName + ", receipe=" + receipe + ", theme=" + theme
				+ ", ingredient=" + ingredient + "]";
	}
	
	
	
	
	
}
