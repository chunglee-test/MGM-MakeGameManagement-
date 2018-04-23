package net.mgm.www.mapper;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import net.mgm.www.vo.User;

@Repository
public class UserDAO implements UserMapper{

	@Inject
	private SqlSession session;
	
	@Override
	public User loginUser(User loginUser) {
		return session.getMapper(UserMapper.class).loginUser(loginUser);
	}

	@Override
	public void signupUser(User signupUser) {
		session.getMapper(UserMapper.class).signupUser(signupUser);
	}

	@Override
	public void signupUserProfile(String userid, String profileName) {
		
		session.getMapper(UserMapper.class).signupUserProfile(userid, profileName);
	}

}
