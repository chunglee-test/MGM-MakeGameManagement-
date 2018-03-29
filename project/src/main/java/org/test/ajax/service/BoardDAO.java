package org.test.ajax.service;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.test.ajax.vo.CHboard;
import org.test.ajax.vo.CHreply;


@Repository
public class BoardDAO {

	@Autowired
	SqlSession sqlSession;
	
	public int insert(CHboard board) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		
		int result = 0;
		try {
			result = mapper.insertBoard(board);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * 글 번호로 해당 게시글 읽기
	 * @param boardnum 검색할 글번호
	 * @return 검색된 게시글 정보. 없으면 null.
	 */
	public CHboard get(int boardnum) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		//해당 번호의 글정보 읽기
		CHboard board = mapper.getBoard(boardnum);
		//조회수 1증가
		mapper.addHits(boardnum);
		return board;
	}
	
	/**
	 * 검색 결과 레코드 수
	 * @param searchText 검색어
	 * @return 글개수
	 */
	public int getTotal(String searchText) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int total = mapper.getTotal(searchText);
		return total;
	}
	
	/**
	 * 한 페이지의 게시글 목록 읽기
	 * @param searchText 검색어
	 * @param startRecord 전체 결과중 읽을 시작 위치 (첫행은 0)
	 * @param countPerPage 읽을 레코드 수 (한페이지당 글 개수)
	 * @return 글목록
	 */
	public ArrayList<CHboard> listBoard(String searchText, int startRecord, int countPerPage) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		//전체 검색 결과 중 읽을 시작위치와 개수
		RowBounds rb = new RowBounds(startRecord, countPerPage);
		
		//검색어와 읽을 범위를 전달
		ArrayList<CHboard> boardlist = mapper.listBoard(searchText, rb);
		return boardlist;
	}

	/**
	 * 글 번호로 해당 게시글 삭제
	 * @param 삭제할 글 번호와 로그인아이디가 포함된 정보
	 * @return 삭제된 글 개수
	 */
	public int deleteBoard(CHboard board) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = mapper.deleteBoard(board);
		return result;
	}

	/**
	 * 게시글 수정
	 * @param board 수정할 글 정보
	 * @return 수정된 글 개수
	 */
	public int updateBoard(CHboard board) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = mapper.updateBoard(board);
		return result;
	}
	/**
	 * 리플 저장
	 * @param reply 저장할 리플 정보
	 */
	public int insertReply(CHreply reply) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = 0;
		try {
			result = mapper.insertReply(reply);
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	/**
	 * 한 게시글의 리플 목록 읽기
	 * @param boardnum 본문 글번호
	 * @return 리플목록
	 */
	public ArrayList<CHreply> listReply(int boardnum) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		ArrayList<CHreply> replylist = mapper.listReply(boardnum);
		return replylist;
	}

	/**
	 * 리플 번호로 해당 리플 삭제
	 * @param reply 삭제할 리플 번호와 로그인아이디가 포함된 정보
	 * @return 삭제된 리플 개수
	 */
	public int deleteReply(CHreply reply) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = mapper.deleteReply(reply);
		return result;
	}

	/**
	 * 리플 수정
	 * @param reply 수정할 리플 정보
	 * @return 수정된 리플 개수
	 */
	public int updateReply(CHreply reply) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = mapper.updateReply(reply);
		return result;
	}
	
	
}
