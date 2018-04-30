package net.mgm.www.mapper;

import net.mgm.www.vo.User;

public interface UserMapper {
	public User loginUser(User loginUser);
	public void signupUser(User signupUser);
	public String idCheck(String joinId);
	public void signupUserProfile(String userid, String profileName);
}
